export type DevicePreset = {
	id: string;
	name: string;
	screenWidth: number;
	screenHeight: number;
	bezel: { top: number; right: number; bottom: number; left: number };
	borderRadius: number;
	screenRadius: number;
	hasDynamicIsland: boolean;
	hasHomeButton: boolean;
	chrome: 'safari' | 'twitter-inapp';
};

export const devices: DevicePreset[] = [
	{
		id: 'iphone-pro-max',
		name: 'Big iPhone',
		screenWidth: 430,
		screenHeight: 932,
		bezel: { top: 14, right: 14, bottom: 14, left: 14 },
		borderRadius: 55,
		screenRadius: 44,
		hasDynamicIsland: true,
		hasHomeButton: false,
		chrome: 'safari',
	},
	{
		id: 'ipad',
		name: 'iPad',
		screenWidth: 820,
		screenHeight: 1180,
		bezel: { top: 24, right: 24, bottom: 24, left: 24 },
		borderRadius: 22,
		screenRadius: 8,
		hasDynamicIsland: false,
		hasHomeButton: false,
		chrome: 'safari',
	},
	{
		id: 'iphone-se-twitter',
		name: 'Small iPhone in Twitter',
		screenWidth: 375,
		screenHeight: 667,
		bezel: { top: 70, right: 5, bottom: 70, left: 5 },
		borderRadius: 42,
		screenRadius: 0,
		hasDynamicIsland: false,
		hasHomeButton: true,
		chrome: 'twitter-inapp',
	},
];
