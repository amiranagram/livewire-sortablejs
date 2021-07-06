## Component

```php
/**
 * @property Collection $tasks
 */
class SimpleList extends Component
{
    /**
     * @param array $payload
     * @return void
     */
    public function updateOrder(array $payload): void
    {
        foreach($payload['dirty'] as $item) {
            Task::query()
                ->whereKey($item['value'])
                ->update(['order' => $item['order']]);
        }
    }

    /**
     * @return Collection
     */
    public function getTasksProperty(): Collection
    {
        return Task::query()
            ->orderBy('order')
            ->take(10)
            ->get();
    }

    /**
     * @return View
     */
    public function render(): View
    {
        $tasks = $this->tasks;

        return view('livewire.simple-list', compact('tasks'));
    }
}
```

## View

```html
<ul
    wire:sortable="updateOrder"
    wire:sortable.animation="150"
    class="divide-y divide-gray-200"
>
    @foreach($tasks as $task)
        <li wire:sortable.item="{{ $task->id }}">
            <div class="block hover:bg-gray-50 cursor-pointer">
                <div class="flex flex-col justify-start px-4 py-4 sm:px-6">
                    <span class="truncate">#{{ $task->id }} — {{ $task->title }}</span>
                    <span class="text-sm text-gray-800 truncate">
                        {{ $task->description }}
                    </span>
                </div>
            </div>
        </li>
    @endforeach
</ul>
```
