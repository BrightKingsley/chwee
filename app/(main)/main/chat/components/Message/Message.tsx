"use client";

import {
  XMarkIcon,
  EllipsisVerticalIcon,
  UserIcon,
} from "@heroicons/react/20/solid";

import {
  AnimateInOut,
  CircularProgress,
  OptionsMenu,
} from "@/app/components/client";
import { IconButton, Button } from "@/app/components/mui";
import {
  Ref,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ACCOUNT, BASE_URL, CONNECT } from "@/constants/routes";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { ChatContext, ModalContext, NotificationContext } from "@/context";
import { textCode } from "@/constants/utils";
import { decodeTextContent, stringToObjectId } from "@/lib/utils";
import { useParams } from "next/navigation";
import { MessageProps } from "../types";
import { LongPressEventType, useLongPress } from "use-long-press";
import { MessageClass } from "@/models/Message";
import { UserClass } from "@/models";
import { pusherClient } from "@/lib/config";
import { ClientMessage } from "@/types/models";

const emotes = ["😂", "💩", "😢", "😭", "💔"];

export default function Message({
  chatID,
  userID, //TODO typecheck
  message: messageWithSenderData,
  roomType,
  inTransit,
}: MessageProps) {
  const { triggerModal } = useContext(ModalContext);
  const {
    setToggleTransactionForm,
    toggleTransactionForm,
    sendMessage,
    setReplyMessage,
    resetInput,
    setViewImages,
    uploadProgress,
    inputRef,
    setMessages,
  } = useContext(ChatContext);
  const { triggerNotification } = useContext(NotificationContext);

  const [showMore, setShowMore] = useState(false);

  // TODO: comeback to this, its linked with the circular progress/uploadprogress
  useEffect(() => {
    if (uploadProgress >= 100) inTransit = false;
  }, [uploadProgress]);

  const messageData: MessageClass & UserClass = {
    ...messageWithSenderData.senderInfo,
    ...messageWithSenderData.message,
  };

  const textContent = messageData.textContent;
  const imageContent: string[] | undefined = messageData.imageContent;
  const sender = messageData.sender.toString();
  const username = messageData.username;
  const photo = messageData.photo;
  const tag = messageData.tag;
  const replyTo = messageData.replyTo;
  const type = messageData.type;
  const transaction = messageData.transaction;
  const sendDate = messageData.sendDate;
  const messageID = messageData.id.toString();
  // const reactions = messageData.reactions;

  const msgSendDate = new Date(sendDate);
  const hours = msgSendDate.getHours();
  const minutes = msgSendDate.getMinutes();
  const AmPm = hours >= 12 ? "pm" : "am";
  const formattedTime = `${hours % 12 || 12}:${minutes
    .toString()
    .padStart(2, "0")}${AmPm}`;

  const { data } = useSession();
  const session: Session | null = data;

  const messageRef = useRef<HTMLDivElement>();

  const callback = useCallback(() => {
    setShowMore(true);
  }, []);
  const bind = useLongPress(callback, {
    // onFinish: () => setShowMore(false),
    threshold: 1000,
    filterEvents: (event) => true,
    captureEvent: true,
    cancelOnMovement: false,
    cancelOutsideElement: true,
    detect: LongPressEventType.Touch,
  });

  const handlers = bind("test context");

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sender]);

  useEffect(() => {
    if (!messageID) return;
    pusherClient.subscribe(messageID);
    pusherClient.bind(
      "add-reaction",
      ({
        reaction,
        sender,
        messageID,
      }: {
        reaction: string;
        sender: string;
        messageID: string;
      }) => {
        if (sender === userID) {
          return;
        } else {
          addReaction({ messageID, reaction, sender });
        }
      }
    );
    return () => pusherClient.unsubscribe(chatID);
  }, []);

  function addReaction({
    messageID,
    reaction,
    sender,
  }: {
    messageID: string;
    reaction: string;
    sender: string;
  }) {
    setMessages((prevMessages) => {
      // Use map to create a new array with the updated message
      return prevMessages.map((message) => {
        if (message.message.id === messageID) {
          // Check if reaction already exists
          // const hasReaction = message.message.reactions?.some(
          //   (react) => reaction in react
          // );

          // If reaction doesn't exist, add it

          let messageReactions = message.message.reactions![reaction];

          if (!messageReactions) message.message.reactions![reaction] = [];

          message.message.reactions![reaction].push(sender);

          // message.message.reactions![message.message.reactions!.length][
          //   `${"okayy"}`
          // ] &&
          //   message.message.reactions![message.message.reactions!.length][
          //     reaction
          //   ].push(sender);
        }
        return message;
      });
    });
  }

  async function handleAddReaction(reaction: string) {
    addReaction({ messageID, reaction, sender });
    try {
      const response = await fetch(`${BASE_URL}/api/messaging/${chatID}`, {
        method: "PATCH",
        body: JSON.stringify({ messageID, reaction }),
      });
      const data = await response.json();
      console.log("REACTION", { data });
    } catch (error) {
      console.error({ error });
      triggerNotification("Couldn't add reaction");
    }
  }

  if (!session || !session.user || !session.user.id) return null;

  return type === "notification" ? (
    <div className="w-full px-4 mx-auto text-center">
      <p className="text-xs text-gray-600">{textContent}</p>
    </div>
  ) : (
    <motion.div
      {...handlers}
      ref={messageRef as Ref<HTMLDivElement>}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      drag="x"
      dragElastic={{
        left: sender === userID ? 0.5 : 0,
        right: sender === userID ? 0 : 0.5,
      }}
      dragDirectionLock={true}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e: PointerEvent, info) => {
        const offset = info.offset.x;
        if (sender !== userID) {
          if (offset > 100) {
            setReplyMessage({
              sender: sender === userID ? session.user.name! : username,
              textContent: textContent
                ? decodeTextContent(textContent)
                : undefined,
              imageContent,
            });
            inputRef.current.focus();
          }
        }
        if (sender === userID) {
          if (offset < -100) {
            setReplyMessage({
              sender: sender === userID ? session.user.name! : username,
              textContent: textContent
                ? decodeTextContent(textContent)
                : undefined,
              imageContent,
            });
            inputRef.current.focus();
          }
        }
      }}
      className={`relative min-w-[8rem] cursor-grab active:cursor-grabbing transition-colors duration-100 flex px-1 py-1 flex-col max-w-[90%] ${
        sender === userID
          ? "bg-primary text-white TODO"
          : "bg-brand-lightblue text-white"
      }  rounded-t-xl ${
        sender === userID
          ? "flex-row-reverse self-end rounded-l-xl"
          : "rounded-r-xl"
      } w-fit rounded-b-[0.2rem] ${
        imageContent && imageContent.length > 0 && !textContent && "!rounded-xl"
      } ${
        messageData.reactions &&
        Object.keys(messageData.reactions).length > 0 &&
        "!mb-6"
      }`}
    >
      <AnimateInOut
        show={showMore}
        animate={{ scale: 1, opacity: 1 }}
        init={{ scale: 0.5, opacity: 0 }}
        out={{ scale: 0.5, opacity: 0 }}
        className={`absolute z-10 flex items-center gap-2 px-1 text-xl bg-white  rounded-full -top-8 ${
          sender === userID ? "-right-0" : "left-0"
        }`}
      >
        {emotes.map((emote, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, translateY: 5 }}
            animate={{ scale: 1, translateY: 0 }}
            transition={{ delay: i / 10 }}
            onClick={() => setShowMore(false)}
            className="cursor-pointer"
          >
            <div
              onClick={() => handleAddReaction(emote)}
              className="p-1 transition-all duration-200 rounded-full active:scale-[10] active:rotate-12 hover:scale-150 active:z-20 text-2xl"
            >
              {emote}
            </div>
          </motion.div>
        ))}
      </AnimateInOut>
      {replyTo && replyTo?.sender && (
        <div
          className={`flex gap-2 bg-white/90 my-[2px] pl-3 rounded-lg ___ relative_ p-1_ after:absolute after:left-1 w-full after:inset-0 ${
            sender === userID
              ? "after:bg-brand-yellow"
              : "after:bg-brand-darkblue"
          } after:h-[80%] after:w-1 after:my-auto mx-auto after:rounded-full overflow-clip ${
            replyTo.imageContent && replyTo.imageContent?.length > 0 && ""
          }`}
        >
          <div className="flex-1">
            <small className="font-bold_ text-primary">
              {replyTo.sender.toString() === session.user.name?.toString()
                ? "You"
                : replyTo.sender}
            </small>
            <p className="pb-1 text-sm font-bold text-gray-500 _replied-text_">
              {replyTo.textContent}
            </p>
          </div>
          {replyTo &&
            replyTo.imageContent &&
            replyTo.imageContent.length > 0 && (
              <div
                onClick={() =>
                  setViewImages((prev) => ({
                    ...prev,
                    images: replyTo.imageContent!,
                  }))
                }
                className="w-20 min-h-[5rem] h-full ml-auto"
              >
                <Image src={replyTo.imageContent[0]} alt="image content" fill />
              </div>
            )}
        </div>
      )}
      {roomType === "group" && sender != userID && (
        <small
          className={
            sender === userID
              ? "text-end text-brand-yellow"
              : "text-start text-brand-darkblue_ text-brand-yellow  ml-12_"
          }
        >
          {username}
        </small>
      )}
      <div className="relative flex flex-col">
        <div
          className={`absolute flex items-center py-1 gap-1 -bottom-2 ${
            sender === userID ? "-left-8" : "-right-8"
          } text-2xl`}
        >
          <IconButton
            onClick={() => setShowMore((prev) => !prev)}
            className="rounded-full"
          >
            {showMore ? (
              <XMarkIcon className="w-6 h-6 text-gray-600" />
            ) : (
              <EllipsisVerticalIcon className="w-6 h-6 text-gray-600" />
            )}
          </IconButton>

          <div className="fixed z-20  -translate-x-1/2 -translate-y-1/2 !text-sm left-1/2 top-1/2">
            <OptionsMenu
              setShow={setShowMore}
              show={showMore}
              options={[
                {
                  label: "reply",
                  onClick: () => {
                    setReplyMessage({
                      sender: sender === userID ? session.user.name! : username,
                      textContent,
                      imageContent,
                    });
                  },
                },
                {
                  label: "start",
                  onClick: () => {},
                },
                { label: "block", onClick: () => {} },
              ]}
            />
          </div>
        </div>
        <div
          className={` flex items-start gap-2_ ${
            sender === userID ? "flex-row-reverse" : ""
          }`}
        >
          {roomType === "group" && sender != userID && (
            <Link
              href={`${CONNECT}/${tag}`}
              className="flex items-center justify-center mb-1 rounded-full w-7 h-7 translate-y-2_ shrink-0 bg-brand-darkblue overflow-clip "
            >
              {photo ? (
                <Image src={photo} alt={username} fill draggable={false} />
              ) : (
                <UserIcon className="w-5 h-5 fill-gray-300" />
              )}
            </Link>
          )}
          <div className="flex flex-col w-full items-end_ justify-between_ gap-4_">
            {type === "conversation" ? (
              <>
                {imageContent && imageContent.length > 0 && (
                  <div className="grid rounded-md bg-brand-yellow/70 grid-cols-2 w-52 h-52 gap-[2px] relative">
                    <div className="absolute inset-0 m-auto">
                      {inTransit && sender === userID && (
                        <CircularProgress radius={20} value={uploadProgress} />
                      )}
                    </div>
                    {imageContent.slice(0, 4).map((image, i) => (
                      // <></>
                      <div
                        onClick={() =>
                          setViewImages((prev) => ({
                            ...prev,
                            clickedImage: i,
                            images: imageContent,
                          }))
                        }
                        key={i}
                        className={`rounded-md relative flex items-center justify-center overflow-clip cursor-pointer ${
                          imageContent.length > 1 ? "col-auto" : "col-span-full"
                        }`}
                      >
                        {imageContent.length > 4 && i === 3 && (
                          <div className="absolute z-10 flex items-center justify-center w-full h-full text-2xl text-white bg-black/40">
                            +{imageContent.slice(3, -1).length}
                          </div>
                        )}
                        <Image src={image} alt="message img" fill />
                      </div>
                    ))}
                  </div>
                )}

                {textContent && (
                  <p className={`p-1 flex-1 pr-10`}>{textContent}</p>
                )}
              </>
            ) : transaction?.type === "request" ? (
              <div className="flex-1 p-1 space-y-2 pr-10__">
                <div className="">
                  <p>
                    <Link
                      href={
                        textContent?.split(textCode)[1].split(":")[1] ===
                        session.user.name
                          ? ACCOUNT
                          : `${CONNECT}/${
                              textContent?.split(textCode)[1].split(":")[1]
                            }`
                      }
                      className="font-bold underline underline-offset-2"
                    >
                      {textContent?.split(textCode)[1].split(":")[0] ===
                      session.user.name
                        ? "You"
                        : textContent?.split(textCode)[1].split(":")[1]}
                    </Link>{" "}
                    requested for{" "}
                    <span className="text-sm font-bold font-druk-wide-bold">
                      ₦{transaction.amount}
                    </span>{" "}
                    {/* to{" "}
                    <Link
                      href={`${CONNECT}/${textContent}`}
                      className="text-primary"
                    >
                      {textContent?.split(textCode)[1].split(":")[1] === session.user.name
                        ? "You"
                        : textContent?.split(textCode)[1].split(":")[1]}
                    </Link> */}
                  </p>
                </div>
                {textContent?.split(textCode)[1].split(":")[0] !==
                  session.user.name && (
                  <div className="px-3">
                    <Button
                      onClick={() => {
                        // setToggleTransactionForm({ show: true, type: "send" });
                        triggerModal({
                          cancel: () => {
                            resetInput();
                            triggerModal({});
                          },
                          confirm: () => {
                            sendMessage({
                              message: {
                                type: "fund",
                                sendDate: new Date(),
                                textContent: "Here you go...",
                                imageContent: [],
                                transaction: {
                                  type: "send",
                                  amount: transaction.amount,
                                  receiver: textContent
                                    ? textContent
                                        .split(textCode)[1]
                                        .split(":")[1]
                                    : "",
                                },
                                sender: session.user.name as string,
                                replyTo: {
                                  sender:
                                    textContent
                                      ?.split(textCode)[1]
                                      .split(":")[0] || "",
                                  textContent: `${tag} requested for ₦${transaction?.amount}`,
                                },
                              },
                              chatID,
                              roomType,
                            });
                          },
                          message: (
                            <p>
                              Send{" "}
                              <span className="text-primary">
                                ₦{transaction.amount}
                              </span>{" "}
                              to{" "}
                              <Link
                                href={`${CONNECT}/${tag}`}
                                className="underline underline-offset-2"
                              >
                                {tag}
                              </Link>
                            </p>
                          ),
                        });
                      }}
                      color="white"
                      fullWidth
                      className="font-bold text-primary"
                    >
                      Send
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 p-1 space-y-2 pr-10_">
                <div className="">
                  <p>
                    <Link
                      href={`${CONNECT}/${tag}`}
                      className="font-bold underline underline-offset-2"
                    >
                      {username === session.user.name ? "You" : tag}
                    </Link>{" "}
                    sent{" "}
                    <span className="text-sm font-bold font-druk-wide-bold">
                      ₦{transaction?.amount}
                    </span>{" "}
                    to{" "}
                    <Link
                      href={`${CONNECT}/${
                        textContent?.split(textCode)[1].split(":")[1]
                      }`}
                      className="font-bold text-white"
                    >
                      {textContent?.split(textCode)[1].split(":")[1] ===
                      session.user.name
                        ? "You"
                        : textContent?.split(textCode)[1].split(":")[1]}
                    </Link>
                  </p>
                </div>
                {textContent?.split(textCode)[1].split(":")[0] ===
                  session.user.name && (
                  <div className="px-3">
                    <Button
                      onClick={() => {
                        sendMessage({
                          message: {
                            type: "conversation",
                            sendDate: new Date(),
                            textContent: "Thank You!😭",
                            imageContent: [],
                            sender: session.user.name as string,
                            replyTo: {
                              sender:
                                textContent?.split(textCode)[1].split(":")[0] ||
                                "",
                              textContent: `${tag} sent ${
                                textContent?.split(textCode)[1].split(":")[1]
                              } ₦${transaction?.amount}`,
                            },
                          },
                          chatID,
                          roomType,
                        });
                      }}
                      color="white"
                      fullWidth
                      className="font-bold text-primary"
                    >
                      Say Thanks
                    </Button>
                  </div>
                )}
              </div>
            )}
            <small className="absolute -bottom-[6px] text-xs font-semibold text-gray-300 -right-[2px]">
              {formattedTime}
            </small>
          </div>
        </div>
      </div>
      <div
        className={`absolute -bottom-2/3 z-10 h-fit right-0 w-fit rounded-full flex items-center gap-1 py-[2px] px-[3px] bg-white ${
          sender === userID ? "" : "left-0"
        }`}
      >
        {messageData.reactions &&
          Object.keys(messageData.reactions).map((reaction, i) => (
            <div key={i} className="relative text-base">
              {/* {Object.keys(reaction)[0]} */}
              {reaction}
            </div>
          ))}
      </div>
    </motion.div>
  );
}
