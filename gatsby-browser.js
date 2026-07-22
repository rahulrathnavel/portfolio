/**
 * The preserved game tour has a few legacy deep links that originally opened
 * the OS at the root URL. Keep them working after the professional portfolio
 * became the root site, without changing the game itself.
 */
export const onClientEntry = () => {
  const params = new URLSearchParams(window.location.search);
  const isLegacyOsLink =
    window.location.pathname === '/' && (params.has('url') || params.has('app'));

  if (isLegacyOsLink) {
    window.location.replace(`/os/${window.location.search}${window.location.hash}`);
  }
};
