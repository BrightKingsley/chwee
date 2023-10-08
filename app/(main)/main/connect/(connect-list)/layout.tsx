import { Header, SearchBar, SubHeader } from "@/components/shared";
import { CONNECT } from "@/constants/routes";

export default function ConnectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen overflow-auto bg-primary/10">
      <div>
        <Header title="Connect" />
      </div>
      <SubHeader
        sublinks={[
          { label: "my connections", link: `${CONNECT}/my-connections` },
          { label: "unconnected", link: `${CONNECT}/new` },
        ]}
      />
      <div className="space-y-4">
        <div className="md:max-w-md">
          <SearchBar collection="users" />
        </div>
        <div className="px-2 space-y-2 md:grid md:grid-cols-2 md:space-y-0 md:gap-2">
          {children}
        </div>
      </div>
    </div>
  );
}
