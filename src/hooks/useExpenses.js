import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../utils/supabase';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: false });

      if (fetchError) throw fetchError;

      setExpenses(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching expenses:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const addExpense = async (expense) => {
    try {
      const { data, error: insertError } = await supabase
        .from('expenses')
        .insert([expense])
        .select()
        .single();

      if (insertError) throw insertError;

      setExpenses(prev => [data, ...prev]);
      return { success: true, data };
    } catch (err) {
      console.error('Error adding expense:', err);
      return { success: false, error: err.message };
    }
  };

  const updateExpense = async (id, updates) => {
    try {
      const { data, error: updateError } = await supabase
        .from('expenses')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;

      setExpenses(prev => prev.map(exp => exp.id === id ? data : exp));
      return { success: true, data };
    } catch (err) {
      console.error('Error updating expense:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteExpense = async (id) => {
    try {
      const { error: deleteError } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      setExpenses(prev => prev.filter(exp => exp.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Error deleting expense:', err);
      return { success: false, error: err.message };
    }
  };

  return {
    expenses,
    loading,
    error,
    addExpense,
    updateExpense,
    deleteExpense,
    refetch: fetchExpenses
  };
};
