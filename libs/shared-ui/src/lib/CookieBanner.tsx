'use client';
import { useUserTracking } from "@tracker-workspace/hooks";

export const CookieBanner = () => {
  const { isNewUser, consentGiven, giveConsent } = useUserTracking();

  if (!consentGiven && isNewUser) {
    return (
      <div className="bg-blue-950 fixed bottom-0 h-72 w-full p-16">
        <div className="flex text-white gap-32">
           <div>
           <h2 className="text-4xl font-bold mb-8">We care about your privacy !</h2>
           <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae placeat id aut minus beatae est labore? Id ipsum ullam et magnam? Cupiditate perspiciatis nesciunt quibusdam iure voluptatibus voluptatum ut eaque.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem magnam nisi nemo! Id ullam deleniti eaque minus eveniet commodi? Tenetur suscipit fugit non odio beatae obcaecati quidem quisquam. Repellat, magni!</p>

           </div>
           <div>
            <button className="border border-blue-950 bg-white text-blue-950 p-4 rounded-lg w-40 hover:text-white  hover:border-white hover:bg-blue-950 transition-all duration-200" onClick={giveConsent}>Accept Terms</button>
            <button className="border border-red-500 p-4 rounded-lg w-40 text-red-500 mt-4 hover:text-white hover:border-red-500 hover:bg-red-500 transition-all duration-200">Decline Terms</button>
           </div>
        </div>
      </div>
    );
  }

  return null;
};
