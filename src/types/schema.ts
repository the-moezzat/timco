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
          albums: Json | null;
          archive: boolean;
          category: string;
          content: string | null;
          created_at: string;
          draft: boolean;
          id: number;
          thumbnail: string | null;
          title: string;
        };
        Insert: {
          albums?: Json | null;
          archive?: boolean;
          category?: string;
          content?: string | null;
          created_at?: string;
          draft?: boolean;
          id?: number;
          thumbnail?: string | null;
          title?: string;
        };
        Update: {
          albums?: Json | null;
          archive?: boolean;
          category?: string;
          content?: string | null;
          created_at?: string;
          draft?: boolean;
          id?: number;
          thumbnail?: string | null;
          title?: string;
        };
        Relationships: [];
      };
      current_items: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          link: string | null;
          section_id: number | null;
          title: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          link?: string | null;
          section_id?: number | null;
          title?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          link?: string | null;
          section_id?: number | null;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'current_items_section_id_fkey';
            columns: ['section_id'];
            referencedRelation: 'current_sections';
            referencedColumns: ['id'];
          }
        ];
      };
      current_sections: {
        Row: {
          created_at: string;
          id: number;
          title: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          title?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          title?: string | null;
        };
        Relationships: [];
      };
      gallery: {
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
