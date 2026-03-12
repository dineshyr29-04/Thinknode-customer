import { Link, useNavigate } from 'react-router-dom';

export default function ServiceCard({ service }) {
  const navigate = useNavigate();
  const { id, title, tagline, description, startingPrice, deliveryTime, icon, color } = service;

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Gradient top bar */}
      <div className={`h-1.5 bg-gradient-to-r ${color}`} />

      <div className="p-6 flex flex-col flex-1">
        {/* Icon & title */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl shadow-md flex-shrink-0`}
          >
            {icon}
          </div>
          <div>
            <h3 className="text-slate-800 font-bold text-lg leading-tight">{title}</h3>
            <p className="text-slate-400 text-sm mt-0.5">{tagline}</p>
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6">{description}</p>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-6">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide">Starting at</p>
            <p className="text-indigo-600 font-bold text-xl">{startingPrice}</p>
          </div>
          <div className="w-px h-10 bg-gray-100" />
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide">Delivery</p>
            <p className="text-slate-700 font-semibold text-sm">{deliveryTime}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            to={`/services/${id}`}
            className="flex-1 text-center px-4 py-2.5 border border-indigo-200 text-indigo-600 font-semibold text-sm rounded-xl hover:bg-indigo-50 transition-colors"
          >
            Learn More
          </Link>
          <button
            onClick={() => navigate(`/order?service=${id}`)}
            className={`flex-1 px-4 py-2.5 bg-gradient-to-r ${color} text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity shadow-md`}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
