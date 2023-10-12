export default function GroupInfo({
  params,
}: {
  params: { groupTag: string };
}) {
  return <div>{params.groupTag} info</div>;
}
