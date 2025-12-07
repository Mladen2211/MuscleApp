export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

export const formatNumber = (value?: number) => (value || value === 0 ? value.toLocaleString('en-US') : '0');
