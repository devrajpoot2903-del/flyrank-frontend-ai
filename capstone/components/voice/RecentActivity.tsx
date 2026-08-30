interface ActivityEvent {
  id: string;
  icon: string;
  text: string;
  time: string;
  type: "create" | "complete" | "delete" | "update";
}

interface RecentActivityProps {
  events: ActivityEvent[];
}

export default function RecentActivity({ events }: RecentActivityProps) {
  return (
    <div className="p-5">
      <h2 className="text-[13px] font-semibold text-stone-700 mb-3">
        Recent Activity
      </h2>

      {events.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-[12px] text-stone-400">No activity yet.</p>
          <p className="text-[12px] text-[#4B6B4A] mt-1 font-medium">
            Activate the mic and speak a command.
          </p>
        </div>
      ) : (
        <ol className="space-y-3">
          {events.map((event) => (
            <li key={event.id} className="flex items-start gap-2.5">
              <span className="text-[14px] mt-0.5 flex-shrink-0">
                {event.icon}
              </span>
              <div className="min-w-0">
                <p className="text-[12px] text-stone-600 leading-snug">
                  {event.text}
                </p>
                <p className="text-[11px] text-stone-400 mt-0.5">{event.time}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
