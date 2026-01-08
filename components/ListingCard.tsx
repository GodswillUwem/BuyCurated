
import React from 'react';
import { Link } from 'react-router-dom';
import { Listing } from '../types';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const discount = listing.discount || 0;

  return (
    <Link 
      to={`/p/${listing.id}`}
      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden group flex flex-col h-full border border-gray-100"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={listing.images[0]} 
          alt={listing.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute bottom-2 left-2 bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-sm shadow-md uppercase">
          Maker Direct
        </div>
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm">
            -{discount}%
          </div>
        )}
      </div>
      
      <div className="p-2.5 flex flex-col flex-1">
        <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 mb-1 min-h-[32px] group-hover:text-primary transition-colors leading-tight">
          {listing.title}
        </h3>
        
        <div className="flex items-baseline space-x-1.5 mb-1">
          <span className="text-base font-black text-primary">${listing.price.toFixed(2)}</span>
          {discount > 0 && (
            <span className="text-[10px] text-gray-400 line-through">${(listing.price * (1 + discount/100)).toFixed(2)}</span>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-2">
          <span className="bg-primary-soft text-primary text-[9px] font-bold px-1.5 py-0.5 rounded border border-primary-soft uppercase tracking-tighter">Small Batch</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center text-[10px] text-gray-400 font-medium truncate">
            {listing.location.split(',')[0]}
          </div>
          {listing.verified && (
            <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.64.304 1.24.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
    </Link>
  );
};
