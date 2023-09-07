export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      blog: {
        Row: {
          category: string | null;
          content: string | null;
          created_at: string;
          draft: boolean;
          id: number;
          thumbnail: string | null;
          title: string | null;
        };
        Insert: {
          category?: string | null;
          content?: string | null;
          created_at?: string;
          draft?: boolean;
          id?: number;
          thumbnail?: string | null;
          title?: string | null;
        };
        Update: {
          category?: string | null;
          content?: string | null;
          created_at?: string;
          draft?: boolean;
          id?: number;
          thumbnail?: string | null;
          title?: string | null;
        };
        Relationships: [];
      };
      images: {
        Row: {
          created_at: string;
          id: number;
          img: string | null;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          img?: string | null;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          img?: string | null;
          name?: string | null;
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
}
