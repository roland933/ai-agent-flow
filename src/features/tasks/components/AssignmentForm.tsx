
type AssignmentFormProps = {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
};

export default function AssignmentForm({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: AssignmentFormProps) {
  return (
    <div className="space-y-4 pt-3">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-200">
          Assignment title
        </label>

        <input
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="e.g. Research the topic"
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-200">
          Description
        </label>

        <textarea
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          placeholder="Describe what this agent should do..."
          rows={4}
          className="w-full resize-none rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
        />
      </div>
    </div>
  );
}
