export default function LoadingMessages(){
    return <div className="w-full h-ful flex flex-col gap-3">
        <div className="flex items-start gap-3">
            <div className="bg-gray-100 w-8 h-8 rounded-full animate-loader"/>
            <div className="w-[80%] h-12 bg-gray-100 rounded-b-2xl rounded-r-2xl animate-loader self-start"/>
        </div>
        <div className="flex items-start gap-3">
            <div className="bg-gray-100 w-8 h-8 rounded-full animate-loader"/>
            <div className="w-[60%] h-12 bg-gray-100 rounded-b-2xl rounded-r-2xl animate-loader self start"/>
        </div>
        <div className="flex items-start gap-3 flex-row-reverse">
            <div className="bg-gray-100 w-8 h-8 rounded-full animate-loader"/>
            <div className="w-[60%] h-12 bg-gray-100 rounded-b-2xl rounded-l-2xl animate-loader self-end"/>
        </div>
        <div className="flex items-start gap-3">
            <div className="bg-gray-100 w-8 h-8 rounded-full animate-loader"/>
            <div className="w-[70%] h-12 bg-gray-100 rounded-b-2xl rounded-r-2xl animate-loader self-start"/>
        </div>
        <div className="flex items-start gap-3 flex-row-reverse">
            <div className="bg-gray-100 w-8 h-8 rounded-full animate-loader"/>
            <div className="w-[50%] h-40 bg-gray-100 rounded-b-2xl rounded-l-2xl animate-loader self-end"/>
        </div>
        <div className="flex items-start gap-3 flex-row-reverse">
            <div className="bg-gray-100 w-8 h-8 rounded-full animate-loader"/>
            <div className="w-[50%] h-12 bg-gray-100 rounded-b-2xl rounded-l-2xl animate-loader self-end"/>
        </div>
        <div className="flex items-start gap-3">
            <div className="bg-gray-100 w-8 h-8 rounded-full animate-loader"/>
            <div className="w-[50%] h-12 bg-gray-100 rounded-b-2xl rounded-r-2xl animate-loader self-start"/>
        </div>
    </div>
}