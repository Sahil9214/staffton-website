export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
//try_files $uri $uri/ $uri.html /index.html =404;