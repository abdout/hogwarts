import Image from "next/image";
import SectionHeading from "../atom/section-heading";

export default function EventCard() {
  // Type definitions
  interface Event {
    date: string;
    month: string;
    title: string;
    time: string;
    location: string;
    isHighlighted: boolean;
    isDisabled?: boolean;
  }

  // Event data array
  const events: Event[] = [
    {
      date: "01",
      month: "September",
      title: "Hogwarts Welcome Feast",
      time: "7PM — 10PM",
      location: "@ Great Hall, Hogwarts Castle",
      isHighlighted: true
    },
    {
      date: "15",
      month: "October",
      title: "Defense Against Dark Arts Seminar",
      time: "2PM — 5PM",
      location: "@ Defense, Hogwarts",
      isHighlighted: false
    },
    {
      date: "31",
      month: "October",
      title: "Halloween Feast & Celebration",
      time: "6PM — 11PM",
      location: "@ Great Hall, Hogwarts Castle",
      isHighlighted: false
    },
    {
      date: "25",
      month: "December",
      title: "Christmas Holiday Feast",
      time: "5PM — 9PM",
      location: "@ Great Hall, Hogwarts Castle",
      isHighlighted: false,
      isDisabled: true
    }
  ];

  return (
    <div className="min-h-screen px-2 md:px-0">
      <div className="">
        <SectionHeading
        title="Events"
        description="what's happening"
      />
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 py-14">
          {events.map((event, index) => (
            <div 
              key={index} 
              className={`${event.isHighlighted 
                ? 'bg-yellow-400 text-white dark:bg-yellow-500' 
                : 'bg-neutral-100 dark:bg-neutral-700'} p-8 flex flex-col h-full`}
            >
              <div className={`text-7xl font-light mb-1 ${
                !event.isHighlighted 
                  ? (event.isDisabled 
                    ? 'text-neutral-300 dark:text-neutral-500' 
                    : 'text-neutral-700 dark:text-neutral-200') 
                  : ''
              }`}>
                {event.date}
              </div>
              <div className={`text-sm tracking-wider pb-10 ${
                !event.isHighlighted 
                  ? (event.isDisabled 
                    ? 'text-neutral-300 dark:text-neutral-500' 
                    : 'text-neutral-700 dark:text-neutral-200') 
                  : ''
              }`}>
                {event.month}
              </div>

              <h2 className={`text-2xl font-light pb-4 ${
                !event.isHighlighted 
                  ? (event.isDisabled 
                    ? 'text-neutral-300 dark:text-neutral-500' 
                    : 'text-neutral-700 dark:text-neutral-200') 
                  : ''
              }`}>
                {event.title.split(' ').slice(0, 2).join(' ')}
                <br />
                {event.title.split(' ').slice(2).join(' ')}
              </h2>

              <div className={`mt-auto ${
                !event.isHighlighted 
                  ? (event.isDisabled 
                    ? 'text-neutral-300 dark:text-neutral-500' 
                    : 'text-neutral-700 dark:text-neutral-200') 
                  : ''
              }`}>
                <div className="pb-1 text-sm font-medium">{event.time}</div>
                <div className="text-sm font-medium">{event.location}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Feed Section */}
        <div className="pt-12 border-t pt-4 border-neutral-200 dark:border-neutral-700">
          <div className="flex items-start gap-4 mb-8 w-full md:w-[70%]">
            <Image 
              src="/logo.png" 
              alt="logo" 
              width={40} 
              height={40} 
              className="rounded-full object-cover w-10 h-10 bg-yellow-400 p-1.5"
              priority
              quality={100}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">@hogwarts</span>
                <span className="text-neutral-500 dark:text-neutral-400 text-sm">4 minutes ago in</span>
                <span className="text-blue-600 dark:text-neutral-300">#events</span>
              </div>
              <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                Hogwarts School of Witchcraft and Wizardry invites you to attend our Welcome Feast - 
                where we&apos;ll present our magical curriculum, discuss the challenges ahead, and open dialogue about our shared journey in the wizarding world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  