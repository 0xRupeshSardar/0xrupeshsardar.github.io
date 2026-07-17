export const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export const extractText = (node) => {
  if (node == null || node === false) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (typeof node === 'object' && node.props) return extractText(node.props.children);
  return '';
};
