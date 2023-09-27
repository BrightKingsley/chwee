import {redirect} from "next/navigation"
import {CHATS} from "@/constants/routes"

export default function Chat() {
  redirect(CHATS)
}
