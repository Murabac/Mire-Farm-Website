import { createServerClient, isSupabaseConfigured } from './supabase';
import { Product, LocalizedProduct } from '@/types/products';
import { Language } from '@/types/hero';

/**
 * Helper functions for working with Products from Supabase
 */

// Get all active products from database
export async function getProducts(): Promise<Product[]> {
  // Check if Supabase is configured
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Products section will use fallback data.');
    return [];
  }

  try {
    const supabase = createServerClient();
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return (data as Product[]) || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Helper function to get localized product
export function getLocalizedProduct(
  product: Product,
  language: Language = 'en'
): LocalizedProduct {
  const nameKey = `name_${language}` as keyof Product;
  const descriptionKey = `description_${language}` as keyof Product;
  
  const name = (product[nameKey] as string | undefined) || product.name_en;
  const description = (product[descriptionKey] as string | undefined) || product.description_en || '';

  return {
    id: product.id,
    name: name,
    description: description,
    image: product.image,
    price: product.price,
    category: product.category,
    in_stock: product.in_stock,
    display_order: product.display_order,
  };
}

// Helper function to get localized products array
export function getLocalizedProducts(
  products: Product[],
  language: Language = 'en'
): LocalizedProduct[] {
  return products.map((product) => getLocalizedProduct(product, language));
}
