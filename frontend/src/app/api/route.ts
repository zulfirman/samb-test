import { NextResponse } from "next/server";


export async function GET(req: Request) {
	setTimeout(() => {
		if (!req.headers.has("x-api-key")) {
			return NextResponse.json({ message: "Kurang Header" }, { status: 401 })
		}

		return NextResponse.json({
			hello: "World"
		})
	}, 3000)
}

export async function POST(req: Request) {
	setTimeout(() => {

	}, 3000)

	return NextResponse.json({
		user: {
			name: "User " + Math.floor(Math.random() * 100)
		},
		tokens: {
			accessToken: String(Math.floor(Math.random() * 100)),
			refreshToken: String(Math.floor(Math.random() * 100)),
		}
	}, { status: 200 })
}
