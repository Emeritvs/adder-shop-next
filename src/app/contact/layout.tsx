export default function Layout(props: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10">
      {props.modal}
      {props.children}
    </div>
  );
}
