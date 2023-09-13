import {Header} from "@/components"
export default function Loading() {

  const LoadingColor = "bg-"

   const LoadingP = ({children, className}:{children?:React.ReactNode, className?:string})=> {

    console.log(className)

    return<LoadingP className={`bg-gray-400 ${className} text-gray-400 rounded-md p-2`}>{children}</LoadingP>};

    const LoadingSpan = ({children, className}:{children?:React.ReactNode, className?:string})=> {

    console.log(className)

    return<div className={`bg-gray-400 ${className} text-gray-400 rounded-md`}>{children}</div>};

    const LoadingSmall = ({children, className}:{children?:React.ReactNode, className?:string})=> {

    console.log(className)

    return<small className={`bg-gray-400 ${className} text-gray-400 rounded-md  p-1`}>{children}</small>};

  const LoadingDiv = ({children, className}:{children?:React.ReactNode, className?:string})=> {

    console.log(className)

    return<div className={`bg-gray-400 ${className}`}>{children}</div>};

  const LoadingIcon = <div className="w-6 h-6 bg-white rounded-full"></div>

  return (
    <div className="flex flex-col h-screen !bg-white">
      <Header title="wallet" imgShown  />
      <div className="h-full py-4 space-y-6 !bg-white">
        <div className="mx-2">
          <div className="w-full border p-4 mx-auto space-y-4 text-white h-48_ rounded-2xl overflow-clip ">
            <div className="flex items-center justify-between">
              <div className="flex gap-1 font-semibold items-">
                <LoadingSmall>Available Balance</LoadingSmall>
                <span
                  className="text-xl cursor-pointer active:scale-90"
                  >
                    {LoadingIcon}
                </span>
              </div>
              <div>
                <LoadingSmall className="flex items-center">
                  Transactions History
                  <span>
                    {LoadingIcon}
                  </span>
                </LoadingSmall>
              </div>
            </div>
            <div>
             
                <LoadingP className="space-x-1 text-3xl font-bold">
                  <span>*</span>
                  <span>*</span>
                  <span>*</span>
                </LoadingP>
              <LoadingSmall>& Cashback ₦1.50</LoadingSmall>
            </div>
            <div className="flex justify-around">
              <div className="flex flex-col items-center justify-center gap-1">
                <div
                  className="p-1 text-3xl bg-white rounded-xl text-primary"
                >
                  {LoadingIcon}
                </div>
                <LoadingSmall>Add money</LoadingSmall>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <div
                  className="p-1 text-3xl bg-white rounded-xl text-primary"
                >
                 {LoadingIcon}
                </div>
                <LoadingSmall>Transfer</LoadingSmall>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <div
                  className="p-1 text-3xl bg-white rounded-xl text-primary"
                >
                {LoadingIcon}
                </div>
                <LoadingSmall>Withdraw</LoadingSmall>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto text-center">
          <div className="flex items-center justify-around">
            <div className="flex flex-col items-center justify-center">
              <div
                className="p-4 text-2xl rounded-full bg-primary/10 text-primary"
              >
               {LoadingIcon}
              </div>
              <LoadingSmall>Airtime</LoadingSmall>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div
                className="p-4 text-2xl rounded-full bg-primary/10 text-primary"
              >
                {LoadingIcon}
              </div>
              <LoadingSmall>Data</LoadingSmall>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div
                className="p-4 text-2xl rounded-full bg-primary/10 text-primary"
              >
                {LoadingIcon}
              </div>
              <LoadingSmall>More</LoadingSmall>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
