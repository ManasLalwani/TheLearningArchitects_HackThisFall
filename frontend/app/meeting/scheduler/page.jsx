"use client";
import React from "react";
import { GoogleCalendar } from "datebook";
import { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const { push } = useRouter();
  const [email, setEmail] = "";
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [calLink, setCalLink] = useState(false);
  // useEffect(() => {
  //   const init = async () => {
  //     const { Datepicker, Input, initTE } = await import("tw-elements");
  //     initTE({ Datepicker, Input });
  //   };
  //   init();
  // }, []);

  //   useEffect(() => {
  //     const init = async () => {
  //       const { Timepicker, Input, initTE } = await import("tw-elements");
  //       initTE({ Input, Timepicker });
  //     };
  //     init();
  //   }, []);

  function addHoursToTime(inputTime, hoursToAdd) {
    // Parse the input time
    const [hoursStr, minutesStr] = inputTime.split(":");
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    // Add hours and adjust if necessary
    let adjustedHours = hours + hoursToAdd;
    if (adjustedHours >= 24) {
      adjustedHours -= 24; // Wrap around to the next day
    }

    // Format the adjusted time
    const adjustedHoursStr = String(adjustedHours).padStart(2, "0");
    const adjustedMinutesStr = String(minutes).padStart(2, "0");

    return `${adjustedHoursStr}:${adjustedMinutesStr}`;
  }

  // Example usage:
  const inputTime = `${time}`;
  const adjustedTime = addHoursToTime(inputTime, 2); // Adds 2 hours
  // console.log(adjustedTime); // Output: "12:30"

  const link = "https://meet.google.com/cxw-wrea-vuc";

  const options = {
    title: "Meeting with legal advisor",
    // location: "Online",
    description: `${desc}
                    ${link}`,
    start: new Date(`${date}T${time}:00`),

    end: new Date(`${date}T${adjustedTime}:00`),
    // recurrence: {
    //   frequency: "WEEKLY",
    //   interval: 2,
    // },
  };

  const googleCalendar = new GoogleCalendar(options);

  googleCalendar
    .setParam("crm", "BUSY")
    .setParam("trp", "true")
    .setParam("src", "upendrafalak@gmail.com");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      //  const {data} = await axios.post("/login", { email, password });
      //  setUser(data)
      //   alert("Login successfull!");
      //   setRedirect(true);
      // console.log(`${date}T${time}:00`);
      const fun = googleCalendar.render();
      // console.log(fun);
      // console.log(date);
      // console.log(time);
      // console.log(desc);
      // push(fun);
      setCalLink(fun);
    } catch (error) {
      alert("Something went wrong!");
    }
  }

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12 ">
            <div
              className="wow fadeInUp mb-12 rounded-md bg-primary/[3%] px-8 py-11 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Need Help? Consult a Lawyer
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Schedule a meeting with lawyers nearby you
              </p>
              <form onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="desc"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Subject or Issue
                      </label>
                      <textarea
                        id="desc"
                        value={desc}
                        onChange={(event) => setDesc(event.target.value)}
                        name="desc"
                        rows={5}
                        placeholder="Describe your Issue"
                        className="w-full resize-none rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      ></textarea>
                    </div>
                  </div>

                  {/* date picker */}
                  {/* <div
                      className="relative mb-3"
                      data-te-datepicker-init
                      data-te-input-wrapper-init
                    >
                      <input
                        type="text"
                        className="dark:text-neutral-200 dark:placeholder:text-neutral-200 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        placeholder="Select a date"
                      />
                      <label
                        htmlFor="floatingInput"
                        className="text-neutral-500 dark:text-neutral-200 pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary"
                      >
                        Select a date
                      </label>
                    </div> */}

                  <div className="flex flex-row">
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="name"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={date}
                          onChange={(event) => setDate(event.target.value)}
                          placeholder="Enter the date"
                          className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="name"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Time
                        </label>
                        <input
                          type="time"
                          id="time"
                          name="time"
                          value={time}
                          onChange={(event) => setTime(event.target.value)}
                          placeholder="Enter the time "
                          className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    {/* timepicker */}
                    {/* <div
                    class="relative"
                    data-te-timepicker-init
                    data-te-input-wrapper-init
                  >
                    <input
                      type="text"
                      class="dark:text-neutral-200 dark:placeholder:text-neutral-200 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="form1"
                    />
                    <label
                      for="form1"
                      class="text-neutral-500 dark:text-neutral-200 pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary"
                    >
                      Select a time
                    </label>
                  </div> */}
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="name"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Mode
                        </label>
                        <select
                          name="meetingMode"
                          id="meetingMode"
                          placeholder="Online / Offline "
                          defaultValue="Online"
                          className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        >
                          <option value="online">Online</option>
                          <option value="offline">Offline</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full justify-center px-4">
                    <button
                      type="submit"
                      className="rounded-md bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {calLink ? <a className="flex justify-center text-black text-lg font-bold underline" href={calLink}>Go to Calendar</a> : ""}
    </section>
  );
};

export default page;