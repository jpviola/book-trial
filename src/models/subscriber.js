const { createClient } = require('@supabase/supabase-js');
const config = require('../config/config');

const supabase = createClient(config.supabaseUrl, config.supabaseKey);

class Subscriber {
  static async create(email, language = 'en') {
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .insert([{ email, language }])
        .select()
        .single();

      if (error) {
        if (error.code === '23505' || /duplicate/i.test(error.message)) {
          throw new Error('Email already subscribed');
        }
        throw error;
      }
      return data;
    } catch (err) {
      throw err;
    }
  }

  static async findByEmail(email) {
    const { data, error } = await supabase
      .from('subscribers')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  static async confirm(email) {
    const { data, error } = await supabase
      .from('subscribers')
      .update({ confirmed: true })
      .eq('email', email)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async count() {
    const { count, error } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return count || 0;
  }

  static async getAll() {
    const { data, error } = await supabase
      .from('subscribers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}

module.exports = Subscriber;