export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      events: {
        Row: {
          backgroundColor: string | null
          created_at: string
          editable: boolean | null
          end: string | null
          id: string
          position: number | null
          servicio_id: string | null
          start: string | null
          textColor: string | null
          title: string
        }
        Insert: {
          backgroundColor?: string | null
          created_at?: string
          editable?: boolean | null
          end?: string | null
          id?: string
          position?: number | null
          servicio_id?: string | null
          start?: string | null
          textColor?: string | null
          title?: string
        }
        Update: {
          backgroundColor?: string | null
          created_at?: string
          editable?: boolean | null
          end?: string | null
          id?: string
          position?: number | null
          servicio_id?: string | null
          start?: string | null
          textColor?: string | null
          title?: string
        }
        Relationships: []
      }
      fotos_servicios: {
        Row: {
          created_at: string
          fecha: string | null
          id: number
          observacion: string | null
          servicio_id: string | null
          ubicacion: string | null
          url: string | null
        }
        Insert: {
          created_at?: string
          fecha?: string | null
          id?: number
          observacion?: string | null
          servicio_id?: string | null
          ubicacion?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string
          fecha?: string | null
          id?: number
          observacion?: string | null
          servicio_id?: string | null
          ubicacion?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fotos_servicios_servicio_id_fkey"
            columns: ["servicio_id"]
            isOneToOne: false
            referencedRelation: "resultado_por_semana_y_dia_total"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fotos_servicios_servicio_id_fkey"
            columns: ["servicio_id"]
            isOneToOne: false
            referencedRelation: "servicios"
            referencedColumns: ["id"]
          },
        ]
      }
      fotos_vehiculos: {
        Row: {
          created_at: string
          foto: string | null
          id: number
          vehiculo_id: string | null
        }
        Insert: {
          created_at?: string
          foto?: string | null
          id?: number
          vehiculo_id?: string | null
        }
        Update: {
          created_at?: string
          foto?: string | null
          id?: number
          vehiculo_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fotos_vehiculos_vehiculo_id_fkey"
            columns: ["vehiculo_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      gastos_servicios: {
        Row: {
          created_at: string | null
          fecha: string | null
          id: string
          monto: number | null
          servicio_id: string
          tipo: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          fecha?: string | null
          id?: string
          monto?: number | null
          servicio_id: string
          tipo?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          fecha?: string | null
          id?: string
          monto?: number | null
          servicio_id?: string
          tipo?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gastos_servicios_servicio_id_fkey"
            columns: ["servicio_id"]
            isOneToOne: false
            referencedRelation: "resultado_por_semana_y_dia_total"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gastos_servicios_servicio_id_fkey"
            columns: ["servicio_id"]
            isOneToOne: false
            referencedRelation: "servicios"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: number
          read: boolean | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          read?: boolean | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          read?: boolean | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      plataformas: {
        Row: {
          created_at: string
          id: string
          nombre: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          nombre?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          nombre?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          activo: number | null
          avatar_url: string | null
          birthday: string | null
          driver_license_url: string | null
          first_name: string | null
          full_name: string | null
          id: string
          last_name: string | null
          medical_certificate_url: string | null
          phone: string | null
          role: string | null
          social_security_url: string | null
          updated_at: string | null
          username: string | null
          w_9_url: string | null
          website: string | null
          work_permit_url: string | null
        }
        Insert: {
          activo?: number | null
          avatar_url?: string | null
          birthday?: string | null
          driver_license_url?: string | null
          first_name?: string | null
          full_name?: string | null
          id: string
          last_name?: string | null
          medical_certificate_url?: string | null
          phone?: string | null
          role?: string | null
          social_security_url?: string | null
          updated_at?: string | null
          username?: string | null
          w_9_url?: string | null
          website?: string | null
          work_permit_url?: string | null
        }
        Update: {
          activo?: number | null
          avatar_url?: string | null
          birthday?: string | null
          driver_license_url?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          last_name?: string | null
          medical_certificate_url?: string | null
          phone?: string | null
          role?: string | null
          social_security_url?: string | null
          updated_at?: string | null
          username?: string | null
          w_9_url?: string | null
          website?: string | null
          work_permit_url?: string | null
        }
        Relationships: []
      }
      pruebas: {
        Row: {
          content: string | null
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      servicios: {
        Row: {
          activo: number | null
          allDay: boolean | null
          ano: number | null
          backgroundColor: string | null
          bol: string | null
          broker: string | null
          carga: string | null
          chofer: string | null
          chofer_id: string | null
          created_at: string
          despachador: string | null
          destino: string | null
          dia: number | null
          dia_de_semana: number | null
          editable: boolean | null
          end: string | null
          estatus_pago: string | null
          estatus_servicio: string | null
          fecha_carga: string | null
          fecha_entrega: string | null
          forma_de_pago: string | null
          gasto_estimado: number | null
          id: string
          info_pago: string | null
          millas: number | null
          num_descargas: number | null
          observaciones: string | null
          orden: string | null
          origen: string | null
          peso: number | null
          plataforma: string | null
          pod: string | null
          position: number | null
          precio_de_servicio: number | null
          precio_mano_de_obra: number | null
          rc: string | null
          ruta: string | null
          semana: number | null
          start: string | null
          textColor: string | null
          tipo_de_carga: string | null
          title: string | null
          vehiculo: string | null
          vehiculo_id: string | null
        }
        Insert: {
          activo?: number | null
          allDay?: boolean | null
          ano?: number | null
          backgroundColor?: string | null
          bol?: string | null
          broker?: string | null
          carga?: string | null
          chofer?: string | null
          chofer_id?: string | null
          created_at?: string
          despachador?: string | null
          destino?: string | null
          dia?: number | null
          dia_de_semana?: number | null
          editable?: boolean | null
          end?: string | null
          estatus_pago?: string | null
          estatus_servicio?: string | null
          fecha_carga?: string | null
          fecha_entrega?: string | null
          forma_de_pago?: string | null
          gasto_estimado?: number | null
          id?: string
          info_pago?: string | null
          millas?: number | null
          num_descargas?: number | null
          observaciones?: string | null
          orden?: string | null
          origen?: string | null
          peso?: number | null
          plataforma?: string | null
          pod?: string | null
          position?: number | null
          precio_de_servicio?: number | null
          precio_mano_de_obra?: number | null
          rc?: string | null
          ruta?: string | null
          semana?: number | null
          start?: string | null
          textColor?: string | null
          tipo_de_carga?: string | null
          title?: string | null
          vehiculo?: string | null
          vehiculo_id?: string | null
        }
        Update: {
          activo?: number | null
          allDay?: boolean | null
          ano?: number | null
          backgroundColor?: string | null
          bol?: string | null
          broker?: string | null
          carga?: string | null
          chofer?: string | null
          chofer_id?: string | null
          created_at?: string
          despachador?: string | null
          destino?: string | null
          dia?: number | null
          dia_de_semana?: number | null
          editable?: boolean | null
          end?: string | null
          estatus_pago?: string | null
          estatus_servicio?: string | null
          fecha_carga?: string | null
          fecha_entrega?: string | null
          forma_de_pago?: string | null
          gasto_estimado?: number | null
          id?: string
          info_pago?: string | null
          millas?: number | null
          num_descargas?: number | null
          observaciones?: string | null
          orden?: string | null
          origen?: string | null
          peso?: number | null
          plataforma?: string | null
          pod?: string | null
          position?: number | null
          precio_de_servicio?: number | null
          precio_mano_de_obra?: number | null
          rc?: string | null
          ruta?: string | null
          semana?: number | null
          start?: string | null
          textColor?: string | null
          tipo_de_carga?: string | null
          title?: string | null
          vehiculo?: string | null
          vehiculo_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "servicios_chofer_id_fkey"
            columns: ["chofer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      servicios_old: {
        Row: {
          activo: number | null
          ano: number | null
          bol: string | null
          broker: string | null
          carga: string | null
          chofer: string | null
          chofer_id: string | null
          created_at: string
          despachador: string | null
          destino: string | null
          dia: number | null
          dia_de_semana: number | null
          estatus_pago: string | null
          estatus_servicio: string | null
          fecha_carga: string | null
          fecha_entrega: string | null
          forma_de_pago: string | null
          gasto_estimado: number | null
          id: string
          info_pago: string | null
          millas: number | null
          num_descargas: number | null
          observaciones: string | null
          orden: string | null
          origen: string | null
          peso: number | null
          plataforma: string | null
          pod: string | null
          precio_de_servicio: number | null
          precio_mano_de_obra: number | null
          rc: string | null
          ruta: string | null
          semana: number | null
          tipo_de_carga: string | null
          vehiculo: string | null
          vehiculo_id: string | null
        }
        Insert: {
          activo?: number | null
          ano?: number | null
          bol?: string | null
          broker?: string | null
          carga?: string | null
          chofer?: string | null
          chofer_id?: string | null
          created_at?: string
          despachador?: string | null
          destino?: string | null
          dia?: number | null
          dia_de_semana?: number | null
          estatus_pago?: string | null
          estatus_servicio?: string | null
          fecha_carga?: string | null
          fecha_entrega?: string | null
          forma_de_pago?: string | null
          gasto_estimado?: number | null
          id?: string
          info_pago?: string | null
          millas?: number | null
          num_descargas?: number | null
          observaciones?: string | null
          orden?: string | null
          origen?: string | null
          peso?: number | null
          plataforma?: string | null
          pod?: string | null
          precio_de_servicio?: number | null
          precio_mano_de_obra?: number | null
          rc?: string | null
          ruta?: string | null
          semana?: number | null
          tipo_de_carga?: string | null
          vehiculo?: string | null
          vehiculo_id?: string | null
        }
        Update: {
          activo?: number | null
          ano?: number | null
          bol?: string | null
          broker?: string | null
          carga?: string | null
          chofer?: string | null
          chofer_id?: string | null
          created_at?: string
          despachador?: string | null
          destino?: string | null
          dia?: number | null
          dia_de_semana?: number | null
          estatus_pago?: string | null
          estatus_servicio?: string | null
          fecha_carga?: string | null
          fecha_entrega?: string | null
          forma_de_pago?: string | null
          gasto_estimado?: number | null
          id?: string
          info_pago?: string | null
          millas?: number | null
          num_descargas?: number | null
          observaciones?: string | null
          orden?: string | null
          origen?: string | null
          peso?: number | null
          plataforma?: string | null
          pod?: string | null
          precio_de_servicio?: number | null
          precio_mano_de_obra?: number | null
          rc?: string | null
          ruta?: string | null
          semana?: number | null
          tipo_de_carga?: string | null
          vehiculo?: string | null
          vehiculo_id?: string | null
        }
        Relationships: []
      }
      user: {
        Row: {
          created_at: string
          id: string
          role: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          role?: string | null
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          created_at: string
          document: string | null
          id: string
          image: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          document?: string | null
          id?: string
          image?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          document?: string | null
          id?: string
          image?: string | null
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      resultado_por_semana_y_dia: {
        Row: {
          ano: number | null
          chofer: string | null
          chofer_id: string | null
          dia_de_semana: number | null
          fecha_carga: string | null
          fecha_entrega: string | null
          gasto_estimado: number | null
          precio_de_servicio: number | null
          precio_mano_de_obra: number | null
          semana: number | null
        }
        Relationships: [
          {
            foreignKeyName: "servicios_chofer_id_fkey"
            columns: ["chofer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      resultado_por_semana_y_dia_total: {
        Row: {
          id: string | null
          total_mano_de_obra: number | null
          total_por_servicio: number | null
          total_servicio: number | null
        }
        Relationships: []
      }
      resultado_semanal: {
        Row: {
          semana: number | null
          total_gastos: number | null
          total_ingreso: number | null
          total_mano_de_obra: number | null
        }
        Relationships: []
      }
      resultado_semanal_por_chofer: {
        Row: {
          chofer: string | null
          chofer_id: string | null
          semana: number | null
          total_gastos: number | null
          total_ingreso: number | null
          total_mano_de_obra: number | null
        }
        Relationships: [
          {
            foreignKeyName: "servicios_chofer_id_fkey"
            columns: ["chofer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      resultado_semanal_por_plataforma: {
        Row: {
          nombre: string | null
          semana: number | null
          total_gastos: number | null
          total_ingreso: number | null
          total_mano_de_obra: number | null
        }
        Relationships: []
      }
      resultado_semanal_por_vehiculo: {
        Row: {
          name: string | null
          semana: number | null
          total_gastos: number | null
          total_ingreso: number | null
          total_mano_de_obra: number | null
          total_millas: number | null
          vehiculo_id: string | null
        }
        Relationships: []
      }
      total_gastos_by_servicio: {
        Row: {
          servicio_id: string | null
          total_gasto: number | null
        }
        Relationships: [
          {
            foreignKeyName: "gastos_servicios_servicio_id_fkey"
            columns: ["servicio_id"]
            isOneToOne: false
            referencedRelation: "resultado_por_semana_y_dia_total"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gastos_servicios_servicio_id_fkey"
            columns: ["servicio_id"]
            isOneToOne: false
            referencedRelation: "servicios"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
