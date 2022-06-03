import { Component } from 'solid-js';
import Header from '../components/Header'

const Home: Component = () => {
  return (
    <>
      <Header title="Home" />
      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div class="px-4 py-6 sm:px-0">
            <div class="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4 text-center text-gray-400">
              Here goes your content. You can also go the About page.
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </>
  );
};

export default Home;