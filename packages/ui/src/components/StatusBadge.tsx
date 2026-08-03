import React from 'react';
import { Badge } from './Badge';

const STATUS_MAP: Record<string, { label: string; variant: any }> = {
  NEW_REQUEST:        { label: 'New Request',       variant: 'info'    },
  UNDER_REVIEW:       { label: 'Under Review',      variant: 'purple'  },
  QUOTE_SENT:         { label: 'Quote Sent',        variant: 'warning' },
  QUOTE_EXPIRED:      { label: 'Quote Expired',     variant: 'error'   },
  APPROVED_PAID:      { label: 'Approved & Paid',   variant: 'success' },
  SOURCING:           { label: 'Sourcing',          variant: 'purple'  },
  QUALITY_CHECK:      { label: 'Quality Check',     variant: 'warning' },
  QC_ADMIN_REVIEW:    { label: 'QC Review',         variant: 'warning' },
  QC_APPROVED:        { label: 'QC Approved',       variant: 'success' },
  PACKING:            { label: 'Packing',           variant: 'info'    },
  CUSTOMS_DOCS:       { label: 'Customs Docs',      variant: 'info'    },
  DISPATCHED:         { label: 'Dispatched',        variant: 'info'    },
  IN_TRANSIT:         { label: 'In Transit',        variant: 'purple'  },
  DELIVERED:          { label: 'Delivered',         variant: 'success' },
  COMPLETED:          { label: 'Completed',         variant: 'success' },
  NEEDS_REAPPROVAL:   { label: 'Needs Reapproval',  variant: 'warning' },
  CANCELLED:          { label: 'Cancelled',         variant: 'error'   },
  ARCHIVED:           { label: 'Archived',          variant: 'default' },
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_MAP[status] ?? { label: status, variant: 'default' };
  return <Badge variant={config.variant} className={className}>{config.label}</Badge>;
}
