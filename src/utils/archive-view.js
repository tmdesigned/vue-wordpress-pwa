// Archive display modes. Anything unrecognised falls back to the list view.
export const ARCHIVE_VIEWS = ['list', 'gallery'];

export function normalizeArchiveView (value) {
  return ARCHIVE_VIEWS.includes(value) ? value : 'list';
}

// The view the toggle switches to.
export function nextArchiveView (value) {
  return normalizeArchiveView(value) === 'list' ? 'gallery' : 'list';
}
