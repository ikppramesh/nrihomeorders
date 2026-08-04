import OrderDetailClient from './OrderDetailClient';

export function generateStaticParams() {
  return [{ id: '_' }];
}

export default function OrderDetailPage() {
  return <OrderDetailClient />;
}
