export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	public: {
		Tables: {
			Account: {
				Row: {
					access_token: string | null;
					createdAt: string;
					expires_at: number | null;
					id_token: string | null;
					provider: string;
					providerAccountId: string;
					refresh_token: string | null;
					scope: string | null;
					session_state: string | null;
					token_type: string | null;
					type: string;
					updatedAt: string;
					userId: string;
				};
				Insert: {
					access_token?: string | null;
					createdAt?: string;
					expires_at?: number | null;
					id_token?: string | null;
					provider: string;
					providerAccountId: string;
					refresh_token?: string | null;
					scope?: string | null;
					session_state?: string | null;
					token_type?: string | null;
					type: string;
					updatedAt: string;
					userId: string;
				};
				Update: {
					access_token?: string | null;
					createdAt?: string;
					expires_at?: number | null;
					id_token?: string | null;
					provider?: string;
					providerAccountId?: string;
					refresh_token?: string | null;
					scope?: string | null;
					session_state?: string | null;
					token_type?: string | null;
					type?: string;
					updatedAt?: string;
					userId?: string;
				};
				Relationships: [
					{
						foreignKeyName: "Account_userId_fkey";
						columns: ["userId"];
						isOneToOne: false;
						referencedRelation: "User";
						referencedColumns: ["id"];
					}
				];
			};
			Authenticator: {
				Row: {
					counter: number;
					credentialBackedUp: boolean;
					credentialDeviceType: string;
					credentialID: string;
					credentialPublicKey: string;
					providerAccountId: string;
					transports: string | null;
					userId: string;
				};
				Insert: {
					counter: number;
					credentialBackedUp: boolean;
					credentialDeviceType: string;
					credentialID: string;
					credentialPublicKey: string;
					providerAccountId: string;
					transports?: string | null;
					userId: string;
				};
				Update: {
					counter?: number;
					credentialBackedUp?: boolean;
					credentialDeviceType?: string;
					credentialID?: string;
					credentialPublicKey?: string;
					providerAccountId?: string;
					transports?: string | null;
					userId?: string;
				};
				Relationships: [
					{
						foreignKeyName: "Authenticator_userId_fkey";
						columns: ["userId"];
						isOneToOne: false;
						referencedRelation: "User";
						referencedColumns: ["id"];
					}
				];
			};
			Session: {
				Row: {
					createdAt: string;
					expires: string;
					sessionToken: string;
					updatedAt: string;
					userId: string;
				};
				Insert: {
					createdAt?: string;
					expires: string;
					sessionToken: string;
					updatedAt: string;
					userId: string;
				};
				Update: {
					createdAt?: string;
					expires?: string;
					sessionToken?: string;
					updatedAt?: string;
					userId?: string;
				};
				Relationships: [
					{
						foreignKeyName: "Session_userId_fkey";
						columns: ["userId"];
						isOneToOne: false;
						referencedRelation: "User";
						referencedColumns: ["id"];
					}
				];
			};
			User: {
				Row: {
					createdAt: string;
					email: string;
					emailVerified: string | null;
					id: string;
					image: string | null;
					name: string | null;
					updatedAt: string;
				};
				Insert: {
					createdAt?: string;
					email: string;
					emailVerified?: string | null;
					id: string;
					image?: string | null;
					name?: string | null;
					updatedAt: string;
				};
				Update: {
					createdAt?: string;
					email?: string;
					emailVerified?: string | null;
					id?: string;
					image?: string | null;
					name?: string | null;
					updatedAt?: string;
				};
				Relationships: [];
			};
			VerificationToken: {
				Row: {
					expires: string;
					identifier: string;
					token: string;
				};
				Insert: {
					expires: string;
					identifier: string;
					token: string;
				};
				Update: {
					expires?: string;
					identifier?: string;
					token?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
				Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
		: never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
			Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
	  }
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
			DefaultSchema["Views"])
	? (DefaultSchema["Tables"] &
			DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
			Row: infer R;
	  }
		? R
		: never
	: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
	  }
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
	? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
			Insert: infer I;
	  }
		? I
		: never
	: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
	  }
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
	? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
			Update: infer U;
	  }
		? U
		: never
	: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
		: never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
	? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
	: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema["CompositeTypes"]
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
	? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
	: never;

export const Constants = {
	public: {
		Enums: {},
	},
} as const;
