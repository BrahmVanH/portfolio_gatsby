export interface LayoutProps {
	children: React.ReactNode;
}

export interface ProjectCardProps {
	name: string;
	img: string;
	description: string;
	cardRef: React.Ref;
}

export interface NavbarProps {
	parentRef: React.Ref;
	triggerRef: React.Ref;
}
