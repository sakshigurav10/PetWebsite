// src/components/PetCareGuidelines.js

import React, { useState } from "react";
import Footer from '../components/Footer';
import Header from '../components/Header';
import "./PetCareGuidelines.css"; 

const PetCareGuidelines = () => {
  const [activePet, setActivePet] = useState("cat");
  const [faqExpanded, setFaqExpanded] = useState(false); 

  const handlePetChange = (pet) => {
    setActivePet(pet);
  };

  const toggleFaq = () => {
    setFaqExpanded(!faqExpanded); 
  };

  return (
    <div>
        <Header/>
    <div className="pet-care-container">
      <div className="pet-tabs">
        <button
          className={activePet === "cat" ? "active-tab" : ""}
          onClick={() => handlePetChange("cat")}
        >
          🐱Cat Care
        </button>
        <button
          className={activePet === "dog" ? "active-tab" : ""}
          onClick={() => handlePetChange("dog")}
        >
          🐶Dog Care
        </button>
      </div>

      <div className="pet-care-content">
        {activePet === "cat" && (
          <div className="pet-care-info">
            <h3>Guidelines</h3>
            <section>
              <h4>Nutrition and Diet</h4>
              <p>
              Choose a balanced, high-quality commercial cat food appropriate for your cat’s age (kitten, adult, or senior), size, and health needs. Look for food that lists animal-based protein as the first ingredient.
              Always provide fresh water. Cats often prefer running water, so consider a water fountain to encourage hydration.
              Use treats sparingly to avoid overfeeding and obesity. Ensure that any treats are safe and appropriate for cats.
              </p>
            </section>
            <section>
              <h4>Grooming</h4>
              <p>
              Regular grooming is essential, especially for long-haired cats. Brush your cat weekly to prevent mats and reduce shedding. This also helps with hairballs.
Trim your cat’s claws regularly (every 2-4 weeks) to prevent damage to furniture and to avoid painful claw overgrowth.
Check your cat’s ears for dirt, wax buildup, or signs of infection, especially if they are prone to ear problems. Use a vet-approved ear cleaner if necessary.
Dental disease is common in cats, so brush their teeth regularly using a cat-specific toothbrush and toothpaste. You can also provide dental treats or toys.              </p>
            </section>
            <section>
              <h4> Health Care</h4>
              <p>
              Behavior Changes: Keep an eye on any changes in your cat’s behavior, such as lethargy, excessive grooming, hiding, changes in appetite, or litter box issues. These could be signs of illness.
Obesity is common in cats. Ensure you feed the right amount and avoid overfeeding. Encourage physical activity with play.
Symptoms like vomiting, diarrhea, coughing, or changes in the coat condition require a vet visit.
              </p>
            </section>
            <section>
              <h4>Environmental Enrichment</h4>
              <p>
            Engage your cat in interactive play every day with toys like feather wands, laser pointers, or puzzle feeders. Playtime provides exercise and mental stimulation.
Provide scratching posts or pads to help keep your cat’s claws healthy and to reduce damage to furniture. Cats have a natural instinct to scratch to mark territory.
Cats love vertical spaces. Consider cat trees, shelves, or window perches to satisfy their need for climbing and observing their environment. Also, offer quiet hiding spots where they can retreat when they need to relax.              </p>
            </section>
            <section>
              <h4>End of Life Care</h4>
              <p>
              Senior cats require special care. Regular vet visits, a comfortable and warm resting area, and attention to diet and joint health are crucial.
              If your cat is nearing the end of life, consult your veterinarian about euthanasia options to prevent suffering and provide peace.              </p>
            </section>
          </div>
        )}

        {activePet === "dog" && (
          <div className="pet-care-info">
            <h3>Guidelines</h3>
            <section>
              <h4>Basic Health and Wellness</h4>
              <p>
              Dogs should have annual check-ups with a veterinarian to monitor their health. Puppies need vaccinations, while adult dogs need regular boosters and health assessments.
Ensure dogs are vaccinated against common diseases like rabies, distemper, parvovirus, and bordetella (kennel cough).
Use flea, tick, and heartworm prevention treatments regularly, as advised by your vet.
Spaying/neutering helps prevent unwanted litters and reduces certain health risks.
Regular brushing of a dog's teeth (or using dental chews) helps prevent periodontal disease, which can lead to more serious health problems.
Always have a collar with ID tags, and consider microchipping your dog for permanent identification in case they get lost.
              </p>
            </section>
            <section>
              <h4>Grooming</h4>
              <p>
            Bathe your dog as needed (not too frequently, as it can dry out their skin). Use a gentle dog shampoo.
Regular brushing helps remove dirt, debris, and loose hair, and prevents matting, especially in long-haired breeds.
Trim your dog's nails regularly to prevent overgrowth, which can cause discomfort or injury.
Clean your dog’s ears regularly, especially if they have floppy ears, to prevent infections.
Brush your dog's teeth several times a week to prevent plaque and tartar buildup.              </p>
            </section>
            <section>
              <h4>Nutrition & Diet</h4>
              <p>
            Feed your dog a high-quality dog food that meets their age, breed, and health requirements. Puppies, adult dogs, and senior dogs have different dietary needs.
Follow recommended feeding guidelines to prevent obesity, which can lead to health issues.
Offer treats sparingly and choose healthy options. Treats can be used for training, but ensure they don't exceed 10% of their daily caloric intake.
Ensure your dog always has access to fresh, clean water to stay hydrated.
Never feed dogs chocolate, grapes, raisins, onions, garlic, alcohol, or xylitol (a sugar substitute), as these can be toxic.              </p>
            </section>
            <section>
              <h4>Exercise</h4>
              <p>
              Dogs need regular exercise to stay healthy, both physically and mentally. The amount of exercise depends on your dog’s age, breed, and energy level.
Regular walks are essential for mental stimulation and physical health.
Activities like fetch, tug-of-war, or playing with interactive toys provide great exercise.
Some breeds require more vigorous exercise than others. High-energy breeds (like Border Collies or Australian Shepherds) need more activity compared to lower-energy breeds (like Bulldogs or Basset Hounds).
Puzzle toys or scent games can help keep your dog mentally sharp.              </p>
            </section>
            <section>
              <h4>Training</h4>
              <p>
              Teach your dog basic commands like sit, stay, come, and down. Start training early to ensure good behavior.
Expose your dog to various environments, people, and other dogs to promote positive behavior and reduce fear or aggression.
Teach your dog to walk on a leash without pulling. This is important for walks and safety.
 A crate provides a safe, secure place for your dog when you're not home. It also helps with housebreaking.
 Address common behavioral issues like excessive barking, chewing, or digging. Positive reinforcement can help with correcting these behaviors.              </p>
            </section>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h3 onClick={toggleFaq} className="faq-header">
          Frequently Asked Questions
        </h3>
        {faqExpanded && (
          <div className="faq-content">
            <div className="faq-item">
              <h4>Q1: How often should I take my pet to the vet?</h4>
              <p>A1: For routine checkups, it’s recommended to visit the vet once a year. However, if your pet shows any signs of illness, consult your vet immediately.</p>
            </div>
            <div className="faq-item">
              <h4>Q2: What should I feed my cat?</h4>
              <p>A2: Feed your cat a balanced diet with both wet and dry food, tailored to their age, health, and dietary needs. Always provide fresh water.</p>
            </div>
            <div className="faq-item">
              <h4>Q3: How can I keep my dog healthy?</h4>
              <p>A3: Regular exercise, a balanced diet, grooming, and routine vet checkups are essential for maintaining your dog's health.</p>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default PetCareGuidelines;