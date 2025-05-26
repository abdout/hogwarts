export default function SectionHeading({ title, description }: { title: string, description: string }) {
    return (
      <div className="text-center">
        <h2>
            {title}
        </h2>
        <p className="px-40 pt-2">
            {description}
        </p>
      </div>
    );
  }
  