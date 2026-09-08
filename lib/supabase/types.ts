export type LetterRow = {
  id: string;
  slug: string;
  label: string;
  body: string;
  published: boolean;
  sort_order: number;
  written_at: string | null;
  created_at: string;
  updated_at: string;
};

export type LetterInsert = {
  id?: string;
  slug: string;
  label: string;
  body?: string;
  published?: boolean;
  sort_order: number;
  written_at?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type LetterUpdate = {
  id?: string;
  slug?: string;
  label?: string;
  body?: string;
  published?: boolean;
  sort_order?: number;
  written_at?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type Database = {
  public: {
    Tables: {
      letters: {
        Row: LetterRow;
        Insert: LetterInsert;
        Update: LetterUpdate;
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
