import { supabase } from '../supabase'

export async function updateApplicationStatus(
  id: string,
  status: 'applied' | 'interview' | 'rejected' | 'offer'
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
