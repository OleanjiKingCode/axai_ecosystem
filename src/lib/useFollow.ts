import { useMutation } from "@tanstack/react-query";
import { useAddress, useSDK, useSigner } from "@thirdweb-dev/react";
import { LENS_CONTRACT_ABI, LENS_CONTRACT_ADDRESS } from "../const/contracts";
import { useCreateFollowTypedDataMutation } from "../graphql/generated";
import useLogin from "./auth/useLogin";
import { signTypedDataWithOmmittedTypename, splitSignature } from "./helpers";
import { ethers } from "ethers";

export function useFollow() {
	const { mutateAsync: requestTypedData } = useCreateFollowTypedDataMutation();
	const sdk = useSDK();
	const address = useAddress();
	const { mutateAsync: loginUser } = useLogin();
	const signer = useSigner();

	async function follow(userId: string) {
		await loginUser();
		const typedData = await requestTypedData({
			request: {
				follow: [
					{
						profile: userId,
					},
				],
			},
		});

		const { domain, types, value } = typedData.createFollowTypedData.typedData;

		if (!sdk) return;
		const signature = await signTypedDataWithOmmittedTypename(
			sdk,
			domain,
			types,
			value,
		);

		const { v, r, s } = splitSignature(signature.signature);

		const lensHub = new ethers.Contract(
			LENS_CONTRACT_ADDRESS,
			LENS_CONTRACT_ABI,
			signer,
		);
		const result = await lensHub.followWithSig({
			follower: address,
			profileIds: [userId],
			datas: value.datas,
			sig: {
				v,
				r,
				s,
				deadline: value.deadline,
			},
		});
	}

	return useMutation(follow);
}
