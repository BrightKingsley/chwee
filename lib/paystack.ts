import axios from "axios";

const secretKey = process.env.PAY_STACK_SECRET_KEY!;
const payStack = axios.create({
	baseURL: "https://api.paystack.co",
	headers: {
		Authorization: secretKey,
		"Content-Type": "application/json",
		"Cache-Control": "no-cache",
	},
});

export const initiatePayment = (form: any) => {
	console.log(secretKey);
	return payStack.post("/transaction/initialize", form);
};

export const verifyPayment = (ref: any) => {
	return payStack.get(`/transaction/verify/${encodeURIComponent(ref)}`);
};
