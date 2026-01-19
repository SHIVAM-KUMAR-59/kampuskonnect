import { ChevronRight } from "lucide-react";
import PrimaryButton from "./PrimaryButton";

export default function ProfileCard({ name, experience, org, skills = [], action }) {
  return (
    <div className="group cursor-pointer animate-in fade-in duration-300">
      <div className="relative bg-white border border-gray-200 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-green-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1">
        <div className="absolute inset-0 bg-linear-to-r from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-0 right-0 w-24 h-24 bg-green-100 rounded-full -mr-12 -mt-12 opacity-20 group-hover:opacity-40 transition-opacity duration-300" />

        <div className="relative flex justify-between items-start gap-4">
          <div className="flex gap-4 flex-1">
            <div className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-110">
              {name[0]}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-lg">{name}</p>
              <p className="text-sm text-gray-600 mt-0.5">
                {org} <span className="text-gray-400">·</span> {experience} years of experience
              </p>

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {skills.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="text-xs font-medium bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-200 transition-colors duration-300 hover:bg-green-100"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {action && (
            <PrimaryButton
              classname="px-4 py-2.5 font-semibold text-sm shadow-md hover:shadow-lg group relative overflow-hidden"
              text={
                <div className="relative flex items-center">
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    {action}
                  </span>

                  <ChevronRight
                    className="
            absolute -right-3
            w-4 h-4
            opacity-0
            translate-x-8
            transition-all duration-300
            group-hover:opacity-100
            group-hover:translate-x-0
          "
                  />
                </div>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
