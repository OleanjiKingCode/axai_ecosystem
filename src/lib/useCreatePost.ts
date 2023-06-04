import { useMutation } from "@tanstack/react-query";
import { useSDK, useSigner, useStorageUpload } from "@thirdweb-dev/react";
import {
	PublicationMainFocus,
	useCreatePostTypedDataMutation,
} from "../graphql/generated";
import useLensUser from "./auth/useLensUser";
import { signTypedDataWithOmmittedTypename, splitSignature } from "./helpers";
import { v4 as uuidv4 } from "uuid";
import { LENS_CONTRACT_ABI, LENS_CONTRACT_ADDRESS } from "../const/contracts";
import useLogin from "./auth/useLogin";
import { ethers } from "ethers";

type CreatePostArgs = {
	image: File;
	title: string;
	description: string;
	content: string;
};

export function useCreatePost() {
	const { mutateAsync: requestTypedData } = useCreatePostTypedDataMutation();
	const { mutateAsync: uploadToIpfs } = useStorageUpload();
	const { profileQuery } = useLensUser();
	const sdk = useSDK();
	const { mutateAsync: loginUser } = useLogin();
	const signer = useSigner();

	async function createPost({
		image,
		title,
		description,
		content,
	}: CreatePostArgs) {
		await loginUser();

		const imageIpfsUrl = (await uploadToIpfs({ data: [image] }))[0];
		const postMetadata = {
			version: "2.0.0",
			mainContentFocus: PublicationMainFocus.TextOnly,
			metadata_id: uuidv4(),
			description: description,
			locale: "en-US",
			content: content,
			external_url: null,
			image: imageIpfsUrl,
			imageMimeType: null,
			name: title,
			attributes: [],
			tags: [],
			appId: "axia-eco",
		};

		const postMetadataIpfsUrl = (
			await uploadToIpfs({ data: [postMetadata] })
		)[0];
		const typedData = await requestTypedData({
			request: {
				collectModule: {
					freeCollectModule: {
						followerOnly: false,
					},
				},
				referenceModule: {
					followerOnlyReferenceModule: false,
				},
				contentURI: postMetadataIpfsUrl,
				profileId: profileQuery.data?.defaultProfile?.id,
			},
		});

		const { domain, types, value } = typedData.createPostTypedData.typedData;
		if (!sdk) return;
		const signature = await signTypedDataWithOmmittedTypename(
			sdk,
			domain,
			types,
			value,
		);

		const { v, r, s } = splitSignature(signature.signature);

		const {
			collectModule,
			collectModuleInitData,
			contentURI,
			deadline,
			profileId,
			referenceModule,
			referenceModuleInitData,
		} = typedData.createPostTypedData.typedData.value;

		const lensHub = new ethers.Contract(
			LENS_CONTRACT_ADDRESS,
			LENS_CONTRACT_ABI,
			signer,
		);

		const result = await lensHub.postWithSig({
			profileId: typedData.createPostTypedData.typedData.value.profileId,
			contentURI: typedData.createPostTypedData.typedData.value.contentURI,
			collectModule:
				typedData.createPostTypedData.typedData.value.collectModule,
			collectModuleInitData:
				typedData.createPostTypedData.typedData.value.collectModuleInitData,
			referenceModule:
				typedData.createPostTypedData.typedData.value.referenceModule,
			referenceModuleInitData:
				typedData.createPostTypedData.typedData.value.referenceModuleInitData,
			sig: {
				v,
				r,
				s,
				deadline: typedData.createPostTypedData.typedData.value.deadline,
			},
		});
	}

	return useMutation(createPost);
}
