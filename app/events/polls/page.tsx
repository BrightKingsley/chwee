export default function Polls() {
  return (
    <div className="border w-full h-40 rounded-md p-2 divide-y">
      <div>Vote to suspend Peter</div>
      <div className="flex items-center justify-center h-full">
        <fieldset>
          <label htmlFor="yes" className="flex gap-2">
            <input name="suspend" type="radio" id="yes" />
            <p>
              <span className="font-bold">suspend</span> Peter
            </p>
          </label>
          <label htmlFor="no" className="flex gap-2">
            <input name="suspend" type="radio" id="no" />
            <p>
              <span className="font-bold">dont</span> suspend Peter
            </p>
          </label>
        </fieldset>
      </div>
    </div>
  );
}
