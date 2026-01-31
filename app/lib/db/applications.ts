import { supabase } from '../supabase'

export async function createApplication(input: {
  company: string
  job_title: string
}) {
  const { data, error } = await supabase
    .from('applications')
    .insert(input)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getApplications() {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function updateApplicationStatus(
  id: string,
  status: string
) {
  const { error } = await supabase
    .from('applications')
    .update({ status })
    .eq('id', id)

  if (error) throw error
}

export async function deleteApplication(id: string) {
  const { error } = await supabase
    .from('applications')
    .delete()
    .eq('id', id)

  if (error) throw error
}
