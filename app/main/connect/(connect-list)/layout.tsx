import { Header, SearchBar, SubHeader } from "@/app/components/client";
import { CONNECT } from "@/constants/routes";

export default function ConnectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen overflow-auto bg-primary/10">
      <div className="shrink-0">
        <Header title="Connect" />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="shrink-0">
          <SubHeader
            sublinks={[
              { label: "my connections", link: `${CONNECT}/my-connections` },
              { label: "unconnected", link: `${CONNECT}/new` },
            ]}
          />
        </div>
        <div className="flex-1 flex flex-col space-y-4">{children}</div>
      </div>
    </div>
  );
}
