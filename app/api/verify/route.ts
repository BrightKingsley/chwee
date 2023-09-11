import { verifyPayment } from "@/lib/paystack";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
	try {
		const { ref } = await req.json();
		console.log("ref =>", ref);
		const response = await verifyPayment(ref);
		if (response.data.status === "abandoned") {
			return new Response(JSON.stringify(response.data), {
				status: 404,
				statusText: "Abandoned",
			});
		}

		if (response.data.status === "failed") {
			return new Response(JSON.stringify(response.data), {
				status: 400,
				statusText: "Failed",
			});
		}

		console.log(response.data.data);

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
