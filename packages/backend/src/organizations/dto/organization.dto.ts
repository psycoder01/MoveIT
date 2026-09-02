export class OrganizationDtO {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description: string;
  readonly logoUrl: string;
  readonly plan: string;
  readonly createdBy: string;
  readonly createdAt: string;
}

export class OrganizationMemberDto {
  readonly user: {
    username: string;
    fullName: string;
    email: string;
  };
  readonly role: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
