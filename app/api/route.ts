import { initiatePayment } from "@/lib/paystack";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	return new Response("Hello");
}

export async function POST(req: NextRequest, res: NextResponse) {
	try {
		let { amount, email } = await req.json();
		console.log("Amount =>", amount);
		console.log("email =>", email);

		amount *= 100;
		if (!amount || amount < 3950) {
			return new Response("Amount is too small", { status: 400 });
		}
		const form = { amount, email };
		const response = await initiatePayment(form);
		console.log("Response =>", response.data);

		return new Response(JSON.stringify(response.data), {
			status: 200,
			statusText: "Created Successfully",
		});
	} catch (error) {
		const errorM = error as Error;
		console.log("Error =>", errorM.message);
		return new Response(JSON.stringify(errorM), {
			status: 500,
			statusText: "Internal Server Error",
		});
	}
}
