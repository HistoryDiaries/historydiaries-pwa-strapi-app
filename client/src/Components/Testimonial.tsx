import React from "react";

interface Props {}

const Testimonial = ({}) => {
  const testimonials = [
    {
      testimonial:
        "The teachers’ training workshop was enlightening, giving new perceptions to the teaching of social science. We can explore further the possibilities of teaching ",
      person: "Nimi Chandoik, Teacher, Manav Rachna International School",
    },

    {
      testimonial:
        "For the students of  Gyan Devi Salwan Public School, it was an outstanding experience where they saw history coming alive through a theater show followed by a workshop in which they not only learned but also participated themselves to become part of history and have the real feel of it. It’s a great endeavor by the team at History Diaries to think of something like this in the times when we are forgetting our past and our roots and losing interest in preserving history.   ",
      person: "Vibha Mongia, Teacher, G.D Salwan Public School",
    },

    {
      testimonial:
        "I  would like to study history through stories and theater shows like History Diaries",
      person: "A class 9 student, Amity International School",
    },
  ];
  return (
    <div>
      <section className="card">
        {testimonials.map((e, i) => (
          <div key={i} className="card--content">
            <div className="card-content">
              <q className="t-text">
                {e.testimonial}
                <br />
                <br /> - {e.person}
              </q>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Testimonial;
