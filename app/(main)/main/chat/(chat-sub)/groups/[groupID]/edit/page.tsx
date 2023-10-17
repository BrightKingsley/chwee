import { Header } from "@/app/components/client";
import GroupEditForm from "./GroupEditForm";
import { getGroupByID } from "@/lib/db";

export default async function CreateGroup({
  params,
}: {
  params: { groupID: string };
}) {
  const group = await getGroupByID({ groupID: params.groupID });
  if (!group)
    return (
      <p className="font-bold px-4">{"Couldn't"} retrieve group info...</p>
    );

  return (
    <div className="flex flex-col">
      <div className="shrink-0">
        <Header title={`Edit ${group.name}`} />
      </div>
      <div className="flex-1 overflow-auto">
        <GroupEditForm params={params} />
      </div>
    </div>
  );
}
