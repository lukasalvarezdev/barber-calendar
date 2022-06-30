export interface IBarber {
  id: number
  created_at: string
  name: string
  imageUrl: string
  notAvailable: Array<string>
}

export interface IAppointment {
  id: number
  created_at: string
  date: string
  barber_id: IBarber['id']
  details: string
}