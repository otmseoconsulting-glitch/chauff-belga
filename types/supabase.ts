export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      provinces: {
        Row: {
          id: string
          nis_code: string
          name_fr: string
          name_nl: string
          name_de: string | null
          slug_fr: string
          slug_nl: string
          region: 'brussels' | 'wallonia' | 'flanders'
          capital_fr: string | null
          latitude: number | null
          longitude: number | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['provinces']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['provinces']['Insert']>
        Relationships: []
      }
      arrondissements: {
        Row: {
          id: string
          nis_code: string
          name_fr: string
          name_nl: string
          slug_fr: string
          slug_nl: string
          province_id: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['arrondissements']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['arrondissements']['Insert']>
        Relationships: [
          {
            foreignKeyName: 'arrondissements_province_id_fkey'
            columns: ['province_id']
            isOneToOne: false
            referencedRelation: 'provinces'
            referencedColumns: ['id']
          }
        ]
      }
      communes: {
        Row: {
          id: string
          nis_code: string
          name_fr: string
          name_nl: string
          name_de: string | null
          slug_fr: string
          slug_nl: string
          postal_codes: string[]
          latitude: number
          longitude: number
          province_id: string
          arrondissement_id: string | null
          population: number | null
          area_km2: number | null
          is_major_hub: boolean
          water_hardness_fh: number | null
          transit_axes: string[] | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['communes']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['communes']['Insert']>
        Relationships: [
          {
            foreignKeyName: 'communes_province_id_fkey'
            columns: ['province_id']
            isOneToOne: false
            referencedRelation: 'provinces'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'communes_arrondissement_id_fkey'
            columns: ['arrondissement_id']
            isOneToOne: false
            referencedRelation: 'arrondissements'
            referencedColumns: ['id']
          }
        ]
      }
      service_categories: {
        Row: {
          id: string
          slug: string
          name_fr: string
          name_nl: string
          short_desc_fr: string
          short_desc_nl: string
          long_desc_fr: string | null
          icon_name: string
          price_from: number
          is_emergency: boolean
          priority_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['service_categories']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['service_categories']['Insert']>
        Relationships: []
      }
      pseo_pages: {
        Row: {
          id: string
          commune_id: string
          service_slug: string | null
          full_slug: string
          page_type: 'commune' | 'service_commune' | 'province'
          is_published: boolean
          is_indexed: boolean
          last_crawled_at: string | null
          serp_position: number | null
          impressions_30d: number
          clicks_30d: number
          word_count: number | null
          uniqueness_score: number | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['pseo_pages']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['pseo_pages']['Insert']>
        Relationships: [
          {
            foreignKeyName: 'pseo_pages_commune_id_fkey'
            columns: ['commune_id']
            isOneToOne: false
            referencedRelation: 'communes'
            referencedColumns: ['id']
          }
        ]
      }
      leads: {
        Row: {
          id: string
          full_name: string
          phone: string
          email: string | null
          postal_code: string
          service_type: 'depannage' | 'entretien' | 'installation' | 'reparation' | 'devis' | 'other'
          message: string | null
          commune_id: string | null
          commune_slug: string | null
          user_id: string | null
          is_urgent: boolean
          status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost' | 'spam'
          source_url: string | null
          ip_address: string | null
          user_agent: string | null
          notes: string | null
          contacted_at: string | null
          converted_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['leads']['Insert']>
        Relationships: [
          {
            foreignKeyName: 'leads_commune_id_fkey'
            columns: ['commune_id']
            isOneToOne: false
            referencedRelation: 'communes'
            referencedColumns: ['id']
          }
        ]
      }
      testimonials: {
        Row: {
          id: string
          author_name: string
          author_location: string | null
          rating: number
          content: string
          service_type: string | null
          commune_id: string | null
          source: string
          source_url: string | null
          is_featured: boolean
          status: 'pending' | 'approved' | 'rejected'
          review_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>
        Relationships: [
          {
            foreignKeyName: 'testimonials_commune_id_fkey'
            columns: ['commune_id']
            isOneToOne: false
            referencedRelation: 'communes'
            referencedColumns: ['id']
          }
        ]
      }
      chat_sessions: {
        Row: {
          id: string
          session_token: string
          commune_id: string | null
          postal_code: string | null
          boiler_brand: string | null
          error_code: string | null
          is_emergency: boolean
          safety_triggered: boolean
          lead_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['chat_sessions']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['chat_sessions']['Insert']>
        Relationships: [
          {
            foreignKeyName: 'chat_sessions_commune_id_fkey'
            columns: ['commune_id']
            isOneToOne: false
            referencedRelation: 'communes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'chat_sessions_lead_id_fkey'
            columns: ['lead_id']
            isOneToOne: false
            referencedRelation: 'leads'
            referencedColumns: ['id']
          }
        ]
      }
      chat_messages: {
        Row: {
          id: string
          session_id: string
          role: 'user' | 'assistant' | 'system'
          content: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['chat_messages']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['chat_messages']['Insert']>
        Relationships: [
          {
            foreignKeyName: 'chat_messages_session_id_fkey'
            columns: ['session_id']
            isOneToOne: false
            referencedRelation: 'chat_sessions'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      lookup_communes_by_postal_code: {
        Args: {
          postal_code: string
        }
        Returns: {
          id: string
          name_fr: string
          slug_fr: string
          province_name_fr: string
          distance_km: number
        }[]
      }
      find_nearby_communes: {
        Args: {
          target_commune_id: string
          limit_count?: number
          max_distance_km?: number
        }
        Returns: {
          id: string
          name_fr: string
          slug_fr: string
          province_name_fr: string
          distance_km: number
        }[]
      }
      get_nearest_major_city: {
        Args: {
          target_commune_id: string
        }
        Returns: {
          id: string
          name_fr: string
          slug_fr: string
          distance_km: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
