export class WorkItem {

	constructor(item) {
		this.id = item.id;
		this.name = item.name;
        this.link = item.link;
        this.image = item.image;
        this.jobTitle = item.jobTitle;
        this.description = item.description;
        this.descriptionImages = item.descriptionImages;
        this.startDate = item.startDate;
        this.endDate = item.endDate;
        this.mainAccomplishments = item.mainAccomplishments;
        this.primaryFocus = item.primaryFocus;
        this.companyDescription = item.companyDescription;
        this.techStacks = item.techStacks;
	}

	id: number;
	name: string;
    link: string;
    image: string;
    jobTitle: string;
    description: {
        size: string,
        alignment: string,
        content: string
    };
    descriptionImages: [{
        link: string,
        size: string
    }];
    startDate: string;
    endDate: string;
    mainAccomplishments: string;
    primaryFocus: string;
    companyDescription: string;
    techStacks: string;
}