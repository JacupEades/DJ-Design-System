import DumbHeaderNavigation from "@/components/dumb-components/layout/DumbHeaderNavigation";

export default function HeaderNavigation() {
	// Pass in any amount of links here!!
	const linkObj = [
		{ linkRef: "/", linkTitle: "Home" },
		{ linkRef: "/tracker", linkTitle: "Tracker" },
		{ linkRef: "/profile", linkTitle: "Profile" },
		{ linkRef: "/recipe", linkTitle: "Recipe" },
	];

	return <DumbHeaderNavigation linkObj={linkObj} />;
}
