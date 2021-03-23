import TrackItem from "../track-item.svelte";

import { items } from "../../../../test/fixtures/top-tracks.json";

export default {
	title: "TrackItem",
	component: TrackItem,
	argTypes: {
		label: { control: "text" },
		primary: { control: "boolean" },
		backgroundColor: { control: "color" },
		size: {
			control: { type: "select", options: ["small", "medium", "large"] },
		},
		onClick: { action: "onClick" },
	},
};

const Template = ({ ...args }) => ({
	Component: TrackItem,
	props: args,
});

export const Primary = Template.bind({});
Primary.args = {
	trackItem: items[0],
};
